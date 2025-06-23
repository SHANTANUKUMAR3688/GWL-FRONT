import { useTheme } from "@/hooks/use-theme";
import { Footer } from "@/layouts/footer";
import { Package } from "lucide-react";
import { FaCoins } from "react-icons/fa6";
import Rewards from "./Reward";
import Points from "./Points";
import { useAuth } from "../../contexts/auth";
import { useEffect, useState } from "react";
import API from "../../API/Api";

const EmployeePage = () => {
    const { theme } = useTheme();
    const { singleemployee, fetchuserData } = useAuth();

    useEffect(() => {
        const employeeid = sessionStorage.getItem("employeeid");
        if (employeeid) {
            fetchuserData(employeeid);
        }
    }, [fetchuserData]);

    const [expandedOffers, setExpandedOffers] = useState({});

    const [offerdata, setofferdata] = useState([]);
    const fetchalloffer = async () => {
        try {
            const response = await API.get("/getallapprove-employee-offer");
            setofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchalloffer();
    }, []);

    const [upcomingofferdata, setupcomingofferdata] = useState([]);
    const fetchallupcomingoffer = async () => {
        try {
            const response = await API.get("/getapproveupcoming-employee-offer");
            setupcomingofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchallupcomingoffer();
    }, []);

    const [request, setrequest] = useState([]);
    const getallrequest = async () => {
        try {
            const response = await API.get("/allrequest");
            setrequest(response.data.requests);
        } catch (err) {
            console.error("get all request data failed", err);
        }
    };
    useEffect(() => {
        getallrequest();
    }, []);

    const truncateText = (text, length = 20) => (text?.length > length ? text.slice(0, length) + "..." : text);

    const toggleDescription = (key) => {
        setExpandedOffers((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Employee</h1>
            <div className="flex flex-col items-stretch gap-4 md:flex-row md:gap-6">
                {/* 40% Width Box (Total Points) */}
                <div className="w-full md:w-2/5">
                    <div className="card h-[200px]">
                        <div className="card-header">
                            <div className="w-fit rounded-lg bg-red-500/20 p-2 text-red-500">
                                <Package size={26} />
                            </div>
                            <p className="card-title">Total Points</p>
                        </div>
                        <div className="h-full rounded-lg bg-slate-100 py-2 dark:bg-slate-950">
                            <div className="flex flex-row items-center gap-x-6">
                                <FaCoins className="ml-3 text-6xl text-yellow-500" />
                                <div className="space-y-1">
                                    <div className="flex flex-row gap-x-2">
                                        <span className="text-lg font-bold text-red-500">{singleemployee.TotalPoints}</span>
                                        <p className="text-lg font-bold text-slate-900 dark:text-slate-50">Total Points</p>
                                    </div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-50">Current Balance</p>
                                    <button className="mt-1 rounded-lg bg-red-500 px-3 py-1 text-sm font-semibold text-white">Redeem Points</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* 60% Width Box (notification) */}
                <div className="w-full md:w-3/5">
                    <div className="card h-[200px]">
                        <div className="card-header">
                            <span>
                                <Package
                                    size={26}
                                    className="text-blue-500"
                                />
                            </span>
                            <p className="card-title">Notification</p>
                        </div>
                        <div className="card-body h-full overflow-y-auto p-0">
                            {request
                                .slice()
                                .reverse()
                                .map((sale) => (
                                    <div
                                        key={sale._id}
                                        className="flex flex-col gap-y-2 border-b border-slate-200 p-3 dark:border-slate-700"
                                    >
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {expandedOffers[`latest-${sale._id}`] ? sale.notification : truncateText(sale.notification, 50)}
                                            {sale.notification?.length > 50 && (
                                                <button
                                                    onClick={() => toggleDescription(`latest-${sale._id}`)}
                                                    className="ml-1 text-xs font-medium text-red-500 hover:underline"
                                                >
                                                    {expandedOffers[`latest-${sale._id}`] ? " Show Less" : " Show More"}
                                                </button>
                                            )}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                {/* Latest Offers */}
                <div className="card">
                    <div className="card-header">
                        <span>
                            <Package
                                size={26}
                                className="text-blue-500"
                            />
                        </span>
                        <p className="card-title">Latest Offers</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        {offerdata.map((sale) => (
                            <div
                                key={sale._id}
                                className="flex flex-col gap-y-2 border-b border-slate-200 p-3 dark:border-slate-700"
                            >
                                <p className="font-medium text-slate-900 dark:text-slate-50">{sale.offerTitle}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {expandedOffers[`latest-${sale._id}`] ? sale.offerDescription : truncateText(sale.offerDescription, 50)}
                                    {sale.offerDescription?.length > 50 && (
                                        <button
                                            onClick={() => toggleDescription(`latest-${sale._id}`)}
                                            className="ml-1 text-xs font-medium text-red-500 hover:underline"
                                        >
                                            {expandedOffers[`latest-${sale._id}`] ? " Show Less" : " Show More"}
                                        </button>
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Offers */}
                <div className="card">
                    <div className="card-header">
                        <span>
                            <Package
                                size={26}
                                className="text-blue-500"
                            />
                        </span>
                        <p className="card-title">Upcoming Offers</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        {upcomingofferdata.map((sale, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-y-2 border-b border-slate-200 p-3 dark:border-slate-700"
                            >
                                <p className="font-medium text-slate-900 dark:text-slate-50">{sale.offerTitle}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {expandedOffers[`latest-${sale._id}`] ? sale.offerDescription : truncateText(sale.offerDescription, 50)}
                                    {sale.offerDescription?.length > 50 && (
                                        <button
                                            onClick={() => toggleDescription(`latest-${sale._id}`)}
                                            className="ml-1 text-xs font-medium text-red-500 hover:underline"
                                        >
                                            {expandedOffers[`latest-${sale._id}`] ? " Show Less" : " Show More"}
                                        </button>
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
                {/* Point System Explanation */}
                <div className="card h-auto">
                    <div className="card-header">
                        <p className="card-title text-2xl">Point System Explanation</p>
                    </div>
                    <div className="card-body p-0">
                        <Points />
                    </div>
                </div>

                {/* Redeem Points For */}
                <div className="card">
                    <div className="card-header">
                        <p className="card-title text-2xl">Redeem Points For</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        <Rewards />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default EmployeePage;
