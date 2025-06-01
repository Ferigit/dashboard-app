import { useDelete } from '../hooks/api/useApi';
import Button from '../common/Button';

export function DeleteUserButton({ userId }: { userId: string }) {
  const { mutate, isPending } = useDelete(['users'], '/users');

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      mutate(userId);
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete} disabled={isPending}>
      {isPending ? 'Deleting...' : 'Delete'}
    </Button>
  );
}