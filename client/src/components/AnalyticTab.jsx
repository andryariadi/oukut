import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { PiUsers } from "react-icons/pi";
import { PiCodesandboxLogo } from "react-icons/pi";
import { PiCurrencyDollar } from "react-icons/pi";
import axios from "../libs/axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnalyticTab = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const res = await axios.get("/analytics");
        console.log(res, "<---dianalyticData");

        setAnalyticsData(res.data.analyticsData);
        setDailySalesData(res.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="b-amber-600 max-w-5xl w-full space-y-7">
      {/* Card */}
      <div className="b-violet-500 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AnalyticCard title="Total Users" value={analyticsData.users} icon={PiUsers} color="from-emerald-500 to-teal-700" />

        <AnalyticCard title="Total Products" value={analyticsData.products} icon={PiCodesandboxLogo} color="from-emerald-500 to-teal-700" />

        <AnalyticCard title="Total Sales" value={analyticsData.totalSales} icon={HiOutlineShoppingCart} color="from-emerald-500 to-teal-700" />

        <AnalyticCard title="Total Revenue" value={analyticsData.totalRevenue} icon={PiCurrencyDollar} color="from-emerald-500 to-teal-700" />
      </div>

      {/* Cart */}
      <motion.div className="bg-gray-800/60 rounded-lg p-6 shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#D1D5DB" />
            <YAxis yAxisId="left" stroke="#D1D5DB" />
            <YAxis yAxisId="right" orientation="right" stroke="#D1D5DB" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#10B981" activeDot={{ r: 8 }} name="Sales" />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#3B82F6" activeDot={{ r: 8 }} name="Revenue" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticTab;

const AnalyticCard = ({ title, value, icon: Icon, color }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={`relative bg-gray-800 ${color} p-5 rounded-lg shadow-lg overflow-hidden`}>
    <div className="space-y-2">
      <p className="text-emerald-300 text-sm">{title}</p>
      <h3 className="text-white text-3xl font-bold">{value}</h3>
    </div>

    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-900 opacity-30" />

    <div className="absolute -bottom-4 -right-4 text-emerald-800 opacity-50">
      <Icon size={135} />
    </div>
  </motion.div>
);
