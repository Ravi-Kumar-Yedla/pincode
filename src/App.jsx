import React, { useState } from 'react';
import './App.css'; // Import the CSS file

const App = () => {
  const [pincode, setPincode] = useState('');
  const [results, setResults] = useState([]);
  const [filterResults, setFilterResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterText, setFilterText] = useState('');

  const fetchPincode = async () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      alert('Enter a valid 6-digit code');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data[0].Status === 'Success' && data[0].PostOffice.length > 0) {
        setResults(data[0].PostOffice);
        setFilterResults(data[0].PostOffice);
      } else {
        setError('Couldn’t find the address');
      }
    } catch (error) {
      setError('Error occurred while fetching');
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = () => {
    fetchPincode();
  };

  const handleFilter = (e) => {
    // const text = e.target.value;
    setFilterText(e.target.value);
    setFilterResults(results.filter(result =>
      result.Name.toLowerCase().includes(text.toLowerCase())
    ));
  };

  return (
    <div className="container">
      <h1>Pincode Lookup</h1>
      <input
        type='text'
        onChange={(e) => setPincode(e.target.value)}
        value={pincode}
        placeholder='Enter a 6 Digit code'
      />
      <button onClick={handleLookup}>Lookup</button>

      <input
        type='text'
        value={filterText}
        onChange={handleFilter}
        placeholder='Filter by Post Office Name'
      />

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {filterResults.length > 0 ? (
        filterResults.map((result, index) => (
          <div key={index} className="result-item">
            <strong>Post Office Name:</strong> {result.Name}<br />
            <strong>Pincode:</strong> {result.Pincode}<br />
            <strong>District:</strong> {result.District}<br />
            <strong>State:</strong> {result.State}
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default App;




// import React, { useState } from 'react';

// const App = () => {
//   const [pincode, setPincode] = useState('');
//   const [results, setResults] = useState([]);
//   const [filterResults, setFilterResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [filterText, setFilterText] = useState('');

//   const fetchPincode = async () => {
//     if (pincode.length !== 6 || isNaN(pincode)) {
//       alert('Enter a valid 6-digit code');
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
//       const data = await response.json();

//       if (data[0].Status === 'Success') {
//         setResults(data[0].PostOffice);
//         setFilterResults(data[0].PostOffice);
//       } else {
//         setError('Couldn’t find the address');
//       }
//     } catch (error) {
//       setError('Error occurred while fetching');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLookup = () => {
//     fetchPincode();
//   };

//   const handleFilter = (e) => {
//     const text = e.target.value;
//     setFilterText(text);
//     setFilterResults(results.filter(result =>
//       result.Name.toLowerCase().includes(text.toLowerCase())
//     ));
//   };

//   return (
//     <div>
//       <input
//         type='text'
//         onChange={(e) => setPincode(e.target.value)}
//         value={pincode}
//         placeholder='Enter a 6 Digit code'
//       />
//       <button onClick={handleLookup}>Lookup</button>

//       <input
//         type='text'
//         value={filterText}
//         onChange={handleFilter}
//         placeholder='Filter by post office Name'
//       />

//       {loading && <p>Loading...</p>}

//       {error && <p>{error}</p>}

//       {filterResults.length > 0 ? (
//         filterResults.map((result, index) => (
//           <div key={index}>
//             <strong>Post Office Name:</strong> {result.Name}<br />
//             <strong>Pincode:</strong> {result.Pincode}<br />
//             <strong>District:</strong> {result.District}<br />
//             <strong>State:</strong> {result.State}
//           </div>
//         ))
//       ) : (
//         <p>No results found.</p>
//       )}
//     </div>
//   );
// };

// export default App;
