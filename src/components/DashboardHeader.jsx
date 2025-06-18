import "../styles/dashboard-header.css";

function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <div className="search-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="search-icon"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="search"
            placeholder="Buscar..."
            className="search-input"
          />
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
