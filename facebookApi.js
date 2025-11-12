const axios = require('axios');

async function updateCampaign(amount) {
  const campaignId = process.env.FB_CAMPAIGN_ID;
  const url = `https://graph.facebook.com/v19.0/${campaignId}`;
  const newEndTime = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

  const payload = {
    access_token: process.env.FB_ACCESS_TOKEN,
    lifetime_budget: amount,
    end_time: newEndTime,
  };

  console.log('🔄 Sending update to Facebook with:', payload);

  try {
    const response = await axios.post(url, null, { params: payload });
    console.log(`✅ Facebook campaign ${campaignId} updated with $${amount / 100} and end time ${newEndTime}`);
    console.log('📡 Facebook API response:', response.data);
  } catch (err) {
    console.error('❌ Facebook API Error:', err.response?.data || err.message);
  }
}

module.exports = updateCampaign;
