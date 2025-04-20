async function replayScroll() {
  alert("OmniDrop™: Replaying archive sync from Vault.");
}

document.getElementById("scroll-claim").onclick = () => {
  alert("🪪 ScrollClaim™ initiated. You now own this sector thread.");
};

fetch("claimroot.json")
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById("brand-grid");
    data.brands.forEach(brand => {
      const div = document.createElement("div");
      div.textContent = brand.name;
      div.style.border = "1px solid #444";
      div.style.padding = "1rem";
      grid.appendChild(div);
    });
  });

fetch("vaultpay.log")
  .then(res => res.text())
  .then(text => document.getElementById("vault-logs").textContent = text);
