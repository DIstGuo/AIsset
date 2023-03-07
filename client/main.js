const form = document.querySelector(".prompt-writer");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get the description from the form
  const description = event.target.querySelector("textarea").value;

  // Make a POST request to the server endpoint to generate the images
  const response = await fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: description }),
  });

  const data = await response.json();

  // Extract the image URLs from the response and add them to the asset container
  const assetContainer = document.querySelector("#asset-container");
  assetContainer.innerHTML = "";

  const gridContainer = document.createElement("div");
  gridContainer.classList.add("grid-container");
  assetContainer.appendChild(gridContainer);

  for (const imageUrl of data.imageUrls) {
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.classList.add("card-img-top");
    imgElement.alt = "Generated asset";

    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.appendChild(imgElement);

    gridContainer.appendChild(gridItem);
  }
});
