$(document).ready(function () {
    // Declearing URL of Websites Data to Scrape with CORS Middleware
    const url1 = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.brescadc.com/")
    const url2 = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.theproteinbar.com/")
    const url3 = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://parked.uniweb.no/")
    
    // Declaring Root Selector Elements to use for Extraction
    const rootElement1 = "div.site-content";
    const rootElement2 = "div.site-content";
    const rootElement3 = "body";
    
    // Declaring Output Ids to Embed Scrape content to the DOM
    const outputId1 = "#site1";
    const outputId2 = "#site2";
    const outputId3 = "#site3";
    
    // Declearing Snapshot Button Ids
    const btn1 = "#btn1";
    const btn2 = "#btn2";
    const btn3 = "#btn3";
    
    // URL to send Snapshot to
    const apiUrl = "https://hn.algolia.com/api/v1/search?query=foo&tags=story";
    
    // Invoking the readURLData Function
    readURLData(url1, rootElement1, outputId1);
    readURLData(url2, rootElement2, outputId2);
    readURLData(url3, rootElement3, outputId3);
    
    // Listentening to various click events for Snapshot
    $(btn1).on("click", function () {
        screenshot(outputId1);
    });
    
    $(btn2).on("click", function () {
        screenshot(outputId2);
    });
    
    $(btn3).on("click", function () {
        screenshot(outputId3);
    });

    
    // Read URL Data and Embed HTML Elements to the DOM
     function readURLData(url, rootId, outputId) {

        $.get(url, function(data){
            const content = data.contents;
            const rootElement = $(content).filter(rootId).html(); 
            $(outputId).html(rootElement);
        })
        
    }
    
    // Screenshot Function
    function screenshot(rootId) {

        html2canvas($(rootId), 
        {
            allTaint: true,
            useCORS: true,
                scale: 1,
            })
            .then( async canvas => {
                const doc = new jsPDF()
                const image = await canvas.toDataURL("image/png");
                
                doc.addImage(image, "PNG", 0, 0, 210, 0);
               
                // Download Copy of Snapshot
                await doc.save("snapshot.pdf");
                
                // Send Snapshot to an API Server
                await sendSnapshot(image);

            });
    }
    
    // A function to Send image Data to a Server 
    function sendSnapshot(data) {
        $.post(apiUrl, data, function(response) {

            console.log(response);
        });
    }



})