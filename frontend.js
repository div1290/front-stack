import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

// Roll Number for setting the document title
const rollNumber = "ABCD123";

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Dropdown options
  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
  ];

  // Set website title to roll number
  document.title = rollNumber;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate JSON
      const parsedJson = JSON.parse(jsonInput);
      setError(null);

      // Make the API call to the backend
      const result = await axios.post('https://your-backend-url.com/bfhl', parsedJson);
      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON input. Please enter a valid JSON.');
      setResponse(null);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  // Filter response data based on selected dropdown options
  const renderResponse = () => {
    if (!response) return null;

    let filteredResponse = {};
    selectedOptions.forEach(option => {
      filteredResponse[option.value] = response[option.value];
    });

    return (
      <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>API Response Renderer</h1>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="json-input">Enter JSON:</label>
        <textarea
          id="json-input"
          rows="4"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON data like {"data": ["A", "C", "z"]}'
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div>
          <h3>API Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>

          <Select
            isMulti
            options={options}
            onChange={handleSelectChange}
            placeholder="Select what to display..."
          />

          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
