import { usePost } from '../../hooks/api/useApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormInput from '../../common/FormInput';
import Button from '../../common/Button';

const userSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
});

type UserFormData = z.infer<typeof userSchema>;

export function CreateUserForm() {
    const { mutate, isPending } = usePost<UserFormData, UserFormData>(['users'], '/users');
    const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
    });

    const onSubmit = (data: UserFormData) => {
        mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                label="Name"
                {...register('name')}
                error={errors.name}
            />
            <FormInput
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email}
            />
            <Button type="submit" disabled={isPending}>
                {isPending ? 'Creating...' : 'Create User'}
            </Button>
        </form>
    );
}