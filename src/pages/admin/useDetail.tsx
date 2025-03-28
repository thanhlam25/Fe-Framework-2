import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getUserOne } from '../../api/provider';
import AdminHeader from '../../layouts/adminHeader';
import AdminMenu from '../../layouts/adminMenu';
import { useParams } from 'react-router-dom';

const UseDetail = () => {
  const {id} = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['users',id],
    queryFn: async () => getUserOne({ namespace: `admin/users`, endpoint: '',id : id }),
    staleTime: 60 * 1000,
  });
  console.log(data);
  
  const users = data 
  console.log(users)

  const [useInfo, setUserInfo] = useState({
    first_name: "",
    name: "",
    email: "",
    phone: "",
    date: "",
    sex: "",
    city: "",
    district: "",
    commune: "",
    address: "",
  })

  useEffect(()=>{
    if (users) {
      setUserInfo({
        first_name: users.first_name ||"",
        name:users.name || "",
        email:users.email || "",
        phone:users.phone || "",
        date:users.date || "",
        sex:users.sex || "",
        city:users.city || "",
        district:users.district || "",
        commune:users.commune || "",
        address: users.address || "",
      })
    }
  },[users])
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <AdminMenu className="w-64 bg-black p-6" />
        <main className="mt-[-20px] flex-grow bg-gray-100 ">
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Thông tin người dùng</h2>
                <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Họ và tên đệm</label>
                  <input disabled type="text" placeholder={useInfo.first_name} className=" mt-2 w-full p-3 border rounded-lg focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Tên</label>
                  <input disabled  type="text" placeholder={useInfo.name}  className="mt-2 w-full p-3 border rounded-lg focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <input disabled type="email" placeholder={useInfo.email}  className="mt-2 w-full p-3 border rounded-lg focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">SĐT</label>
                  <input disabled type="text" placeholder={useInfo.phone}  className="mt-2 w-full p-3 border rounded-lg focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Ngày sinh</label>
                  <input disabled type="text" placeholder={useInfo.date}  className="mt-2 w-full p-3 border rounded-lg bg-gray-100"  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Giới tính</label>
                  <input disabled className="mt-2 w-full p-3 border rounded-lg focus:border-indigo-500 focus:ring-indigo-500" placeholder={useInfo.sex = 1 ? "Nam" : "Nữ"}/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Tỉnh / Thành phố </label>
                  <input disabled type="text" placeholder={useInfo.city}  className="mt-2 w-full p-3 border rounded-lg focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Quận / Huyện</label>
                  <input disabled type="text" placeholder={useInfo.district}  className="mt-2 w-full p-3 border rounded-lg focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phường / Xã</label>
                  <input disabled type="text" placeholder={useInfo.commune}  className="mt-2 w-full p-3 border rounded-lg focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Địa chỉ</label>
                  <input disabled type="text" placeholder={useInfo.address}  className="mt-2 w-full p-3 border rounded-lg focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-black text-white px-6 py-3 rounded-lg shadow hover:bg-black/80 transition">
                  <a href="/admin/users">Quay lại</a>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UseDetail;