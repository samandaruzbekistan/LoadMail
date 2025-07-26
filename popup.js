document.getElementById("fetch-data").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extractAndSendLoadData,
    });
  });
  
  function extractAndSendLoadData() {
    function getText(selector) {
      const el = document.querySelector(selector);
      return el ? el.textContent.trim() : '';
    }
  
    function getEmail() {
      const emailEl = document.querySelector('a[href^="mailto:"]');
      return emailEl ? emailEl.textContent.trim() : '';
    }
  
    const loadData = {
      pickup: getText('.route-origin .city'),
      dropoff: getText('.route-destination .city'),
      mileage: getText('.trip-miles'),
      rate: getText('.data-item-total'),
      broker: getText('.company-details.truncate'),
      email: getEmail()
    };
  
    console.log('Yuborilayotgan load maʼlumoti:', loadData);
  
    fetch('http://localhost:8000/api/send-load', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loadData)
    })
    .then(response => response.json())
    .then(result => {
      console.log('API javobi:', result);
      alert('Email yuborildi!');
    })
    .catch(error => {
      console.error('Xato:', error);
      alert('Xatolik yuz berdi.');
    });
  }
  