const SpecTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="tab-list">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-button ${tab === activeTab ? 'active' : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default SpecTabs;
