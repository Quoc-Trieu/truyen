const ROLES = {
  all: { label: 'Tất cả', value: 'ROOT', userRole: 'ROOT', editUser: true },
  admin: { label: 'ADMIN', value: 'ADMIN', userRole: 'ROOT', editUser: true },
  manager: { label: 'Quản trị', value: 'VIEWER', userRole: 'ROOT', editUser: false },
  groupLeader: { label: 'Tổ Trưởng', value: 'MANAGER', userRole: 'USER', editUser: true },
  accountant: { label: 'Kế Toán', value: 'ACCOUNTANT', userRole: 'ROOT', editUser: true },
  labor: { label: 'Nhân Công', value: 'USER', userRole: '', editUser: false },
};

export default ROLES;
