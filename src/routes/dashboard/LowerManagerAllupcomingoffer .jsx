import { Footer } from "@/layouts/footer";
import { PencilLine, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import API from "../../API/Api";

const LowerManagerAllupcomingoffer = () => {
    const { Upcomimgofferdata, fetchupcomingalloffer, employeeUpcomimgofferdata, fetchemployeeallupcomingoffer } = useAuth()
    const [expandedOffers, setExpandedOffers] = useState({});
    
    // delete upcomingoffer
    const deleteoffer = async (id) => {
        try {
            const response = await API.put(`/deleteupcomingoffer/${id}`);
            await fetchupcomingalloffer();
            toast.success(response.data.message); // use backend message directly
        } catch (err) {
            const errorMessage = err.response?.data?.message || "reject failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };
    // delte employee upcoming offer
    const deleteemployeeoffer = async (id) => {
        try {
            const response = await API.put(`/deleteemployeeupcomingoffer/${id}`);
            await fetchupcomingalloffer();
            toast.success(response.data.message); // use backend message directly
        } catch (err) {
            const errorMessage = err.response?.data?.message || "reject failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };

    const truncateText = (text, length = 20) => (text.length > length ? text.slice(0, length) + "..." : text);
    const toggleDescription = (key) => {
        setExpandedOffers((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    
    
    return (
        <div className="flex flex-col gap-y-4 p-6 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Customer Upcoming Offers</h1>
            <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
                <div className="flex lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                    <p className="lg:text-lg sm:text-sm font-semibold dark:text-white">Showing {Upcomimgofferdata.length} Upcoming Offers </p>
                    <Link to={"/LowerManagerlayout/add-upcomingoffers"}><button className="bg-green-500 py-1 px-2 rounded-full hover:bg-green-600 text-white font-medium">Add Offer</button></Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-gray-200 text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Offer ID</th>
                                <th className="px-4 py-2 text-left font-semibold">Start Date</th>
                                <th className="px-4 py-2 text-left font-semibold">End Date</th>
                                <th className="px-4 py-2 text-left font-semibold">Status</th>
                                <th className="px-4 py-2 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {Upcomimgofferdata.map((customer, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-x-4">
                                            <div className="flex flex-col gap-y-2">
                                                <p className="font-medium text-slate-900 dark:text-slate-50">{customer.offerTitle}</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {expandedOffers[`latest-${customer._id}`] ? customer.offerDescription : truncateText(customer.offerDescription, 20)}
                                                    {customer.offerDescription.length > 20 && (
                                                        <button
                                                            onClick={() => toggleDescription(`latest-${customer._id}`)}
                                                            className="ml-1 text-xs font-medium text-red-500 hover:underline"
                                                        >
                                                            {expandedOffers[`latest-${customer._id}`] ? " Show Less" : " Show More"}
                                                        </button>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.offerid}</td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.startDate.slice(0, 10).split("-").reverse().join("-")}</td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.endDate.slice(0, 10).split("-").reverse().join("-")}</td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.status}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <Link to={"/LowerManagerlayout/edit-upcomingoffers"}
                                            state={{ LManagerCustUpOffer: customer._id }}
                                        ><button className="flex items-center gap-1 px-3 py-1 my-3 bg-blue-500 text-white rounded">
                                                <PencilLine size={16} /> Manage
                                            </button></Link>
                                        <button onClick={() => deleteoffer(customer._id)} className="flex items-center gap-1 px-3 py-1 my-3 bg-red-500 text-white rounded">
                                            <Trash size={16} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* employee offer */}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Upcoming Offers</h1>
            <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
                <div className="flex lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                    <p className="lg:text-lg sm:text-sm font-semibold dark:text-white">Showing {employeeUpcomimgofferdata.length} Upcoming Offers </p>
                    <Link to={"/LowerManagerlayout/add-employee-upcomingoffers"}><button className="bg-green-500 py-1 px-2 rounded-full hover:bg-green-600 text-white font-medium">Add Offer</button></Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-gray-200 text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Offer ID</th>
                                <th className="px-4 py-2 text-left font-semibold">Start Date</th>
                                <th className="px-4 py-2 text-left font-semibold">End Date</th>
                                <th className="px-4 py-2 text-left font-semibold">Status</th>
                                <th className="px-4 py-2 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {employeeUpcomimgofferdata.map((customer, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-x-4">
                                            <div className="flex flex-col gap-y-2">
                                                <p className="font-medium text-slate-900 dark:text-slate-50">{customer.offerTitle}</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {expandedOffers[`latest-${customer._id}`] ? customer.offerDescription : truncateText(customer.offerDescription, 20)}
                                                    {customer.offerDescription.length > 20 && (
                                                        <button
                                                            onClick={() => toggleDescription(`latest-${customer._id}`)}
                                                            className="ml-1 text-xs font-medium text-red-500 hover:underline"
                                                        >
                                                            {expandedOffers[`latest-${customer._id}`] ? " Show Less" : " Show More"}
                                                        </button>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.offerid}</td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.startDate.slice(0, 10).split("-").reverse().join("-")}</td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.endDate.slice(0, 10).split("-").reverse().join("-")}</td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.status}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <Link to={"/LowerManagerlayout/edit-employee-upcomingoffers"}
                                            state={{ LManagerEmpUpOffer: customer._id }}
                                        ><button className="flex items-center gap-1 px-3 py-1 my-3 bg-blue-500 text-white rounded justify-center text-center">
                                                <PencilLine size={16} /> Manage
                                            </button></Link>
                                        <button onClick={() => deleteemployeeoffer(customer._id)} className="flex items-center gap-1 px-3 py-1 my-3 bg-red-500 text-white rounded">
                                            <Trash size={16} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LowerManagerAllupcomingoffer;



