const getData = (url) => {
  fetch(url)
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        const error = (data && data.message) || res.statusText;
        return Promise.reject(error);
      }
      return {"result" : data, "Err": false};
    })
    .catch(error => {return {"result": null, "Err": true}});
}

export default getData;
