$(document).ready(function() {
  const currencies = [
    "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR",
  ];

  const fromDropDown = $("#from-currency-select");
  const toDropDown = $("#to-currency-select");

  // Populate dropdowns with currencies
  $.each(currencies, function(index, currency) {
    fromDropDown.append(`<option value="${currency}">${currency}</option>`);
    toDropDown.append(`<option value="${currency}">${currency}</option>`);
  });

  // Set default values
  fromDropDown.val("USD");
  toDropDown.val("EUR");

  // Currency conversion function
  function convertCurrency() {
    const amount = $("#amount").val();
    const fromCurrency = fromDropDown.val();
    const toCurrency = toDropDown.val();

    if (amount.length !== 0) {
      const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

      $.getJSON(apiUrl, function(data) {
        if (data && data.rates && data.rates[toCurrency]) {
          const conversionRate = data.rates[toCurrency];
          const convertedAmount = amount * conversionRate;
          $("#result").text(`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
        } else {
          alert("Failed to fetch exchange rates. Please try again later.");
        }
      }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(`Failed to connect to the API. Error: ${textStatus}`);
      });
    } else {
      alert("Please fill in the amount");
    }
  }

  // Event listener for convert button
  $("#convert-button").click(function() {
    convertCurrency();
  });

  // Initial conversion on page load
  convertCurrency();
});
