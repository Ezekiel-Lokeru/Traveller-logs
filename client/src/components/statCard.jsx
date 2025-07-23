const StatCard = ({ label, value, icon }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition">
      <div className="p-3 bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900 dark:text-blue-300">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-300">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
