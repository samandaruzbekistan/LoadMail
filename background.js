// Send email get request
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'sendLoad') {
        const params = new URLSearchParams(request.payload).toString();
        const url = ``;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log("✅ Yuborildi:", data);
                // Show success notification
                sendResponse({ success: true, message: "Email yuborildi!" });
            })
            .catch(err => {
                console.error("❌ Xato:", err);
                sendResponse({ success: false, message: "Email yuborishda xatolik yuz berdi!" });
            }); 

        return true;
    }
});

