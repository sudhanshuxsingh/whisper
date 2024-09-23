import React from 'react';

const Status = ({ isActive }: { isActive: boolean }) => {
  console.log({ isActive });
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <div
        className={`size-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}
      ></div>
      <p>{isActive ? 'Active' : 'Disabled'}</p>
    </div>
  );
};

export default Status;
