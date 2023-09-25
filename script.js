document.addEventListener("DOMContentLoaded", function () {
    const campaigns = {};

    const addCampaignButton = document.getElementById("add-campaign-btn");
    const updateCampaignButton = document.getElementById("update-campaign-btn");
    const viewCampaignSelect = document.getElementById("select-campaign");
    const viewPacingSelect = document.getElementById("view-campaign");
    const currentSpendDisplay = document.getElementById("current-spend-display");
    const currentImpressionsDisplay = document.getElementById("current-impressions-display");
    const spendPacing = document.getElementById("spend-pacing");
    const budgetPacing = document.getElementById("budget-pacing");

    addCampaignButton.addEventListener("click", function () {
        const campaignName = document.getElementById("campaign-name").value;
        const startDate = new Date(document.getElementById("start-date").value);
        const endDate = new Date(document.getElementById("end-date").value);
        const bookedImpressions = parseInt(document.getElementById("booked-impressions").value);
        const bookedCpm = parseFloat(document.getElementById("booked-cpm").value);

        campaigns[campaignName] = {
            start_date: startDate,
            end_date: endDate,
            booked_impressions: bookedImpressions,
            booked_cpm: bookedCpm,
            current_spend: 0,
            current_impressions: 0
        };

        viewCampaignSelect.innerHTML += `<option value="${campaignName}">${campaignName}</option>`;
        viewPacingSelect.innerHTML += `<option value="${campaignName}">${campaignName}</option>`;
    });

    updateCampaignButton.addEventListener("click", function () {
        const selectedCampaign = viewCampaignSelect.value;
        if (!selectedCampaign) return;

        const currentSpend = parseFloat(document.getElementById("current-spend").value);
        const currentImpressions = parseInt(document.getElementById("current-impressions").value);

        campaigns[selectedCampaign].current_spend = currentSpend;
        campaigns[selectedCampaign].current_impressions = currentImpressions;
    });

    viewPacingSelect.addEventListener("change", function () {
        const selectedCampaign = viewPacingSelect.value;
        if (!selectedCampaign) return;

        const {
            current_spend,
            current_impressions,
            booked_impressions,
            booked_cpm,
        } = campaigns[selectedCampaign];

        currentSpendDisplay.textContent = current_spend.toFixed(2);
        currentImpressionsDisplay.textContent = current_impressions;
        spendPacing.textContent = ((current_spend / (current_impressions / booked_impressions * booked_cpm)) * 100).toFixed(2) + "%";

        // Calculate budget pacing
        const remainingBudget = (booked_impressions - current_impressions) * booked_cpm;
        budgetPacing.textContent = remainingBudget.toFixed(2);
    });

    // Populate the view campaign select options
    for (const campaign in campaigns) {
        viewCampaignSelect.innerHTML += `<option value="${campaign}">${campaign}</option>`;
        viewPacingSelect.innerHTML += `<option value="${campaign}">${campaign}</option>`;
    }
});
