import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import salesData from "./data.json";
import { useState } from "react";
import "./App.css"; // Importa o CSS

const getInitialFilters = () => {
  let category = Object.keys(salesData)[0];
  let product = Object.keys(salesData[category])[0];
  let brand = Object.keys(salesData[category][product])[0];
  return {
    category,
    product,
    brand,
  };
};

export default function App() {
  const [filters, setFilters] = useState(getInitialFilters());

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    const newProduct = Object.keys(salesData[newCategory])[0];
    const newBrand = Object.keys(salesData[newCategory][newProduct])[0];
    setFilters({
      category: newCategory,
      product: newProduct,
      brand: newBrand,
    });
  };

  const handleProductChange = (e) => {
    const newProduct = e.target.value;
    const newBrand = Object.keys(salesData[filters.category][newProduct])[0];
    setFilters({
      ...filters,
      product: newProduct,
      brand: newBrand,
    });
  };

  const handleBrandChange = (e) => {
    setFilters({
      ...filters,
      brand: e.target.value,
    });
  };

  const chartData = salesData[filters.category][filters.product][filters.brand];
  return (
    <div className="app-bg">
      <div className="header">
        <h1 className="header-title">Gráfico de Vendas</h1>
        <div className="filters">
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="select"
          >
            {Object.keys(salesData).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={filters.product}
            onChange={handleProductChange}
            className="select"
          >
            {Object.keys(salesData[filters.category]).map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>

          <select
            value={filters.brand}
            onChange={handleBrandChange}
            className="select"
          >
            {Object.keys(salesData[filters.category][filters.product]).map(
              (brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <div className="main">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0eafc" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#3182bd", fontWeight: 500 }}
              />
              <YAxis tick={{ fill: "#3182bd", fontWeight: 500 }} />
              <Tooltip
                contentStyle={{
                  background: "#f7fbff",
                  border: "1px solid #3182bd",
                  borderRadius: "8px",
                  color: "#222",
                  fontWeight: 500,
                }}
                labelStyle={{ color: "#3182bd", fontWeight: 700 }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: "10px",
                  color: "#3182bd",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                }}
              />
              <Line
                dataKey="value"
                name="Vendas"
                stroke="#3182bd"
                strokeWidth={4}
                dot={{
                  r: 6,
                  fill: "#fff",
                  stroke: "#3182bd",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 8,
                  fill: "#6dd5ed",
                  stroke: "#3182bd",
                  strokeWidth: 3,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}