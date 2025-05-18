import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AllCompaniesContext = createContext();

// Create the Provider component
const AllCompaniesProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);

  // Fetch the allCompanies data when the component mounts
  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch('/companies');
      const {data} = await response.json();
      setCompanies(data);
    };

    fetchCompanies();
  }, []);

  return (
    <AllCompaniesContext.Provider value={{companies}}>
      {children}
    </AllCompaniesContext.Provider>
  );
};

// Export the context and provider
export default AllCompaniesProvider ;
