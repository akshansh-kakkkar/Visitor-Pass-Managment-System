import LogoutButton from '../Components/LogoutButton'
export const AdminNav = () => {

  return (
     <nav>
      <div className='flex bg-black justify-between text-center  p-5'>
        <div>PASSIFY</div>
        <div className='gap-4 flex'>
          <span>Admin Dashboard</span>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default AdminNav