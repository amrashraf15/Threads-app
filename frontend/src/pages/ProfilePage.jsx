import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { Camera } from 'lucide-react';


const ProfilePage = () => {
        const { authUser,isUpdatingProfile,isGettingProfile,updateProfile,getProfile } = useAuthStore();
        const [isEdit, setIsEdit] = useState(false);
        const [selectedImg, setSelectedImg] = useState(null);
        const [ formData,setFormData ] = useState({
            name:'',
            email:'',
            password:'',
            bio:'',
            image:'',
            gender:'',
            dob:'',
        })
        useEffect(() => {
            getProfile();
        },[getProfile]);
        useEffect(() => {
            if (authUser){
                setFormData({
                    name: authUser.name || '',
                    email: authUser.email || '',
                    password:authUser.password || '',
                    bio: authUser.bio || '',
                    image: authUser.image || '',
                    gender: authUser.gender || '',
                    dob: authUser.dob || '',
                })
            }
        },[authUser])

        const handleSave = async () => {
            const updatedData ={
                ...formData
            };
            await updateProfile(updatedData);
            setIsEdit(false);
        };
        const handleImageUpload = async (e) => {
            const file = e.target.files[0];
            if(!file) return;
            if(file.size > 8*1024*1024){
                alert('Image size exceeds 8MB limit.');
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64Image = reader.result;
                setSelectedImg(base64Image);
                setFormData((prev) => ({ ...prev, image: base64Image }));
            };
        };
        if (isGettingProfile) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            </div>
        );
}
    return (
    <section className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
        <h1 className='font-bold text-xl md:text-2xl lg:text-3xl mx-auto'>My Profile</h1>
        <form onSubmit={(e) => e.preventDefault()} className='mt-9 w-full bg-dark-2 p-10'>
            <div className='flex flex-col  items-center gap-4 mb-6'>
                <div className="relative w-32 h-32 ">
                <img src={ selectedImg || formData.image || "/avatar.png"} alt="User" className='w-full h-full rounded-full object-cover border-4 border-gray-300 dark:border-gray-700' />
                {!isEdit && authUser.isVerified && <span className="absolute bottom-0 right-0 p-1 ">
                    <img
                    src="/verf (1).png"
                    alt="Verified"
                    className="w-6 h-6"
                    />
                </span>}
                {isEdit && (
                    <>
                        <label htmlFor="avatar-upload"
                                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
                            <Camera className="w-5 h-5 text-base-200"/>
                        </label>
                        <input
                            id="avatar-upload"
                            type="file"
                            onChange={handleImageUpload}
                            className="hidden"
                            accept="image/*"
                        />
                    </>
                )}
            </div>
                <p className="text-sm ">
                        {isUpdatingProfile ? "Uploading..." : ""}
                </p>
            </div>
            {/* Form Fields */}
            <div className='grid grid-cols-1 gap-6'>
                {/* Name */}
                <div>
                    <label className="block text-sm mb-1">Name</label>
                    <input
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({...prev,name:e.target.value}))}
                    disabled={!isEdit}
                    type="text"
                    placeholder="Name"
                    className="w-full px-3 py-2 border  rounded-md text-sm text-blue-600 focus:outline-none dark:bg-gray-800 focus:border-blue-500"
                    />
                </div>
                {/* Email */}
                <div>
                <label className="block text-sm mb-1">Email</label>
                <input 
                name="email"
                value={formData.email}
                disabled
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 border rounded-md text-sm text-blue-600 focus:outline-none dark:bg-gray-800 focus:border-blue-500"
                />
                </div>
                {/*Bio */}
                <div className='mt-6'>
                    <label className='block text-sm mb-1'>Bio</label>
                    <textarea 
                    name='about'
                    value={formData.bio}
                    onChange={(e) =>setFormData((prev)=>({...prev,bio:e.target.value}))}
                    disabled={!isEdit}
                    className="w-full px-3 py-2 border rounded-md text-sm text-blue-600 resize-none dark:bg-gray-800 focus:outline-none focus:border-blue-500"
                    placeholder="Write about yourself"
                    rows={4}
                    />
                </div>
                {/*Gender */}
                <div>
                    <label className='block text-sm mb-1' >Gender</label>
                    <select 
                    name="gender" 
                    value={formData.gender}
                    onChange={(e) => setFormData((prev)=>({...prev,gender:e.target.value}))}
                    disabled={!isEdit}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-blue-600 bg-white dark:bg-gray-800 dark:text-blue-400 appearance-none focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                    >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                {/*Date of birth */}
                <div>
                    <label className='block text-sm mb-1' >Date of Birth</label>
                    <input
                    type="date"
                    value={formData.dob || ""}
                    onChange={(e) => setFormData((prev)=>({...prev,dob:e.target.value}))}
                    disabled={!isEdit}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-blue-600 bg-white dark:bg-gray-800 dark:text-blue-400 appearance-none focus:outline-none focus:border-blue-500 dark:focus:border-blue-400'
                    />
                </div>
                {/* Save/Edit Button */}
                <div className='mt-6'>
                    {isEdit ?
                        <button
                            onClick={handleSave}
                            className="px-5 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isUpdatingProfile}
                        >
                            {isUpdatingProfile ? "Saving..." : "Save Changes"}
                        </button>
                    :
                        <button
                            onClick={() => setIsEdit(true)}
                            className="px-5 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900 transition duration-200"
                        >
                                Edit Profile
                        </button>
                    }
                </div>
            </div>
        </form>
    </section>
    )
}

export default ProfilePage