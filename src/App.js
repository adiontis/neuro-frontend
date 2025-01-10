// In your useEffect, update the fetch calls:

useEffect(() => {
  const fetchData = async () => {
    console.log('Fetching data from:', process.env.REACT_APP_API_URL);
    
    try {
      // First try the health check
      const healthCheck = await fetch(`${process.env.REACT_APP_API_URL}/`);
      console.log('Health check status:', healthCheck.status);
      const healthData = await healthCheck.json();
      console.log('Health check data:', healthData);

      // Then try quotes
      const quoteRes = await fetch(`${process.env.REACT_APP_API_URL}/api/quotes/random`);
      console.log('Quote response status:', quoteRes.status);
      
      if (!quoteRes.ok) {
        throw new Error(`HTTP error! status: ${quoteRes.status}`);
      }
      
      const quoteData = await quoteRes.json();
      console.log('Quote data:', quoteData);
      setQuote(quoteData);
      
    } catch (error) {
      console.error('Fetch error details:', {
        message: error.message,
        error: error,
        url: process.env.REACT_APP_API_URL
      });
      setError(`${error.message} - API URL: ${process.env.REACT_APP_API_URL}`);
    }
  };

  fetchData();
}, []);