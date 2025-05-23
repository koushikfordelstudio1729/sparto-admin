import {
  Activity,
  DollarSign,
  Eye,
  Package,
  TrendingUp,
  Users,
} from "lucide-react";
import { memo } from "react";

const DashboardPreview = () => {
  return (
    <div className="flex-1 bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 h-screen relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border border-slate-300 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-blue-300 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border border-indigo-300 rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-8 h-8 bg-blue-200 rounded-full"></div>
      </div>

      <div className="text-center text-slate-800 max-w-2xl w-full relative z-10 max-h-full overflow-y-auto">
        <div className="mb-4 lg:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-blue-600 shadow-lg rounded-2xl mb-4">
            <Activity className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent">
            Effortlessly manage your car parts operations
          </h2>
          <p className="text-slate-600 mb-1 text-base lg:text-lg px-4 sm:px-0 font-medium">
            Access your comprehensive automotive dashboard
          </p>
          <p className="text-slate-500 text-sm px-4 sm:px-0">
            Track inventory, sales, and performance in real-time
          </p>
        </div>

        <div className="bg-white backdrop-blur-lg rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 text-left shadow-xl border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-4 lg:mb-6">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg lg:rounded-xl p-3 lg:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-700 text-xs font-medium">
                    Revenue
                  </span>
                </div>
                <TrendingUp className="w-3 h-3 text-emerald-600" />
              </div>
              <div className="text-lg lg:text-xl font-bold text-slate-800 mb-1">
                $189,374
              </div>
              <div className="text-xs text-emerald-600 flex items-center">
                <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1"></span>
                +12.5% from last month
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg lg:rounded-xl p-3 lg:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-700 text-xs font-medium">
                    Inventory
                  </span>
                </div>
                <Eye className="w-3 h-3 text-blue-600" />
              </div>
              <div className="text-lg lg:text-xl font-bold text-slate-800 mb-1">
                6,248
              </div>
              <div className="text-xs text-blue-600 flex items-center">
                <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
                Parts in stock
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg lg:rounded-xl p-3 lg:p-4 shadow-sm hover:shadow-md transition-shadow duration-200 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-700 text-xs font-medium">
                    Customers
                  </span>
                </div>
                <TrendingUp className="w-3 h-3 text-purple-600" />
              </div>
              <div className="text-lg lg:text-xl font-bold text-slate-800 mb-1">
                1,847
              </div>
              <div className="text-xs text-purple-600 flex items-center">
                <span className="inline-block w-1.5 h-1.5 bg-purple-500 rounded-full mr-1"></span>
                Active this month
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg lg:rounded-xl p-3 lg:p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-800">
                Sales Performance
              </h3>
              <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                This Month
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center">
                <div className="text-sm lg:text-base font-bold text-slate-800">
                  $25K
                </div>
                <div className="text-xs text-slate-500">Engine Parts</div>
                <div className="text-xs text-emerald-600 font-medium">
                  +5.2%
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm lg:text-base font-bold text-slate-800">
                  $19K
                </div>
                <div className="text-xs text-slate-500">Brake Systems</div>
                <div className="text-xs text-emerald-600 font-medium">
                  +3.1%
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm lg:text-base font-bold text-slate-800">
                  $12K
                </div>
                <div className="text-xs text-slate-500">Accessories</div>
                <div className="text-xs text-amber-600 font-medium">-1.2%</div>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full shadow-sm"
                style={{ width: "78%" }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>$0</span>
              <span className="font-medium text-slate-700">
                78% of target achieved
              </span>
              <span>$100K</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg lg:rounded-xl p-3 lg:p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-800">
                Recent Orders
              </h3>
              <div className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                View All
              </div>
            </div>
            <div className="space-y-2">
              {[
                {
                  item: "BMW E46 Brake Pads",
                  price: "$185",
                  status: "completed",
                  color: "emerald",
                },
                {
                  item: "Honda Civic Oil Filter",
                  price: "$24",
                  status: "pending",
                  color: "amber",
                },
                {
                  item: "Toyota Camry Headlight",
                  price: "$127",
                  status: "completed",
                  color: "emerald",
                },
              ].map((transaction, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-slate-200 last:border-b-0"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 bg-${transaction.color}-500 rounded-full flex-shrink-0`}
                    ></div>
                    <div>
                      <div className="text-xs text-slate-800 font-medium truncate max-w-32">
                        {transaction.item}
                      </div>
                      <div className="text-xs text-slate-500 capitalize">
                        {transaction.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-800 font-semibold flex-shrink-0">
                    {transaction.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-slate-500 text-xs">
            Join thousands of automotive businesses using Sparto
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(DashboardPreview);
