import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../store/authSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UserProfile = () => {
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.blog.data);

    const validationSchema = Yup.object({
        password: Yup.string().required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    });

    const handlePasswordChange = (values) => {
        dispatch(changePassword(values.password));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2 h-full">
            <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
                <div className="flex justify-center items-center">
                    <span className="text-gray-700 font-semibold text-2xl">User Profile</span>
                </div>
                <div className="mt-4">
                    <div className="flex flex-col space-y-2">
                        <div className="text-gray-700">
                            <span>First Name: {userProfile.first_name}</span>
                        </div>
                        <div className="text-gray-700">
                            <span>Last Name: {userProfile.last_name}</span>
                        </div>
                        <div className="text-gray-700">
                            <span>Email: {userProfile.email}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-gray-700 font-semibold text-xl mb-4">Change Password</h2>
                    <Formik
                        initialValues={{ password: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handlePasswordChange}
                    >
                        <Form className="space-y-4">
                            <div>
                                <label className="text-gray-700">
                                    New Password:
                                    <Field
                                        type="password"
                                        name="password"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </label>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <label className="text-gray-700">
                                    Confirm Password:
                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </label>
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="flex justify-end mt-6">
                                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500">Change Password</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;