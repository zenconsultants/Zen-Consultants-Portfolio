const test = async () => {
  const response = await fetch('https://sheetdb.io/api/v1/4cy25wq4abc58', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: {
        name: "Test",
        email: "test@test.com",
        message: "Test message"
      }
    })
  });
  console.log(response.status);
  console.log(await response.text());
};
test();
