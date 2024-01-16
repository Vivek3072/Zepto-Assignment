import UsersList from '@/components/UsersList'
import { usersData } from '../data/UsersData';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-between p-4">
      <div className="w-full max-w-xl h-full bg-white shadow-lg rounded-xl shadow-lg p-4">
        <Header />
        <UsersList items={usersData} />
      </div>
    </div>
  )
}
