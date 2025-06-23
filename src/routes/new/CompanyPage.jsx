import { Footer } from "@/layouts/footer";
import { PencilLine, Trash } from "lucide-react";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import API from "../../API/Api";

const CompanyPage = () => {
    const { companydata, fetchallcompany } = useAuth();
    const softdeletecompany = async (id) => {
        try {
            const response = await API.patch(
                `/softdelete-company/${id}`,
                null, // no request body
            );
            await fetchallcompany();
            toast.success("company deleted Successfully!");
        } catch (err) {
            const message = "deletion failed";
            toast.error(message);
            console.error("delete error:", err);
        }
    };
    // approve company
    const approvecompany = async (id) => {
        try {
            const response = await API.put(`/approvecompany/${id}`);
            await fetchallcompany();
            toast.success(response.data.message); // use backend message directly
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Approve failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };
    // decline company
    const declinecompany = async (id) => {
        try {
            const response = await API.put(`/rejectcompany/${id}`);
            await fetchallcompany(); // or your function to refresh customer list
            toast.success(response.data.message); // Show success message from backend
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Decline failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };
    // get all request
        const [request,setrequest]=useState([]);
        const getallrequest=async()=>{
        try{
                const response=await API.get('/allcompanyrequest');
                setrequest(response.data.requests);
                //console.log(response.data.requests);
            }
            catch(err){
                const errorMessage = "get all request data failed";
                toast.error(errorMessage);
                console.error(err);
            }
        };
            useEffect(()=>{
                getallrequest();
            },[])
        
        
        const handleAction = async (id, approved) => {
        try{
        const response=await API.post(`/reviewpoints/${id}`, { approved });
        toast.success(response.data.message);
        await getallrequest();
        await fetchallcompany();
        }
        catch(err){
            toast.error(err);
            console.error(err);
        }
      };
    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-6">
            <div>
                <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Company Notification</h1>
                <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                    <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                        <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing {companydata.length} Company</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-gray-200 text-sm">
                            <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold">#</th>
                                    <th className="px-4 py-2 text-left font-semibold">Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Company_Id</th>
                                    <th className="px-4 py-2 text-left font-semibold">Customers</th>
                                    <th className="px-4 py-2 text-left font-semibold">Customers_Id</th>
                                    <th className="px-4 py-2 text-left font-semibold">Points</th>
                                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                                    <th className="px-4 py-2 text-left font-semibold">Manager_Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {companydata.map((company, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                        <td className="px-4 py-3 dark:text-white">{company?.name}</td>
                                        <td className="px-4 py-3 dark:text-white">{company.companyId}</td>
                                        <td className="px-4 py-3 dark:text-white">
                                            {company.customers.map((data, idx) => (
                                                <div key={idx}>
                                                    {data.firstname} {data.lastname}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-4 py-3 dark:text-white">
                                            {company.customers.map((data, idx) => (
                                                <div key={idx}>{data.customerid}</div>
                                            ))}
                                        </td>
                                        <td className="px-4 py-3 dark:text-white">{company.points}</td>
                                        <td className="px-4 py-3 dark:text-white">{company.status}</td>
                                        <td className="px-4 py-3 dark:text-white">{company.manager}</td>
                                        <td className="flex gap-2 px-4 py-3">
                                            <button
                                                onClick={() => approvecompany(company._id)}
                                                className="my-2 flex items-center gap-1 rounded bg-green-500 px-3 py-1 text-white"
                                            >
                                                <PencilLine size={16} /> Approve
                                            </button>

                                            <button
                                                onClick={() => declinecompany(company._id)}
                                                className="my-2 flex items-center gap-1 rounded bg-orange-500 px-4 py-1 text-white"
                                            >
                                                <Trash size={16} /> Decline
                                            </button>
                                            <button
                                                onClick={() => softdeletecompany(company._id)}
                                                className="my-2 flex items-center gap-1 rounded bg-red-500 px-4 py-1 text-white"
                                            >
                                                <Trash size={16} /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* company points */}
                <h1 className="mb-4 mt-4 text-2xl font-bold text-gray-800 dark:text-white">Approve Company points</h1>
                <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                    <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                        <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing {request.length} Request</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-gray-200 text-sm">
                            <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold">#</th>
                                    <th className="px-4 py-2 text-left font-semibold">Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Company_ID</th>
                                    <th className="px-4 py-2 text-left font-semibold">Total_Points</th>
                                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                                    <th className="px-4 py-2 text-left font-semibold">Working</th>
                                    <th className="px-4 py-2 text-left font-semibold">Manager_Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {request.map((data, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="dark:text-white">
                                                    {data.company?.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 dark:text-white">{data.companyId}</td>
                                        <td className="px-4 py-3 dark:text-white">{data.value}</td>
                                        <td className="px-4 py-3 dark:text-white">{data.status}</td>
                                        <td className="px-4 py-3 dark:text-white">{data.type}</td>
                                        <td className="px-4 py-3 dark:text-white">{data.manager}</td>
                                        <td className="flex gap-2 px-4 py-3">
                                            <button
                                                onClick={() => handleAction(data._id, true)}
                                                className="my-2 flex items-center gap-1 rounded bg-green-500 px-3 py-1 text-white"
                                            >
                                                <PencilLine size={16} /> Approve
                                            </button>

                                            <button
                                                onClick={() => handleAction(data._id, false)}
                                                className="my-2 flex items-center gap-1 rounded bg-orange-500 px-4 py-1 text-white"
                                            >
                                                <Trash size={16} /> Decline
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CompanyPage;
