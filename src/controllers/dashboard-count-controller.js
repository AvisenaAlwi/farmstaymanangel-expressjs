import dashboarCountService from "../service/dashboar-count-service.js";

async function getCounts(req, res) {
    try {
      const counts = await dashboarCountService.getCounts();
      res.json({ data: [counts] });
    } catch (error) {
      console.error('Error fetching counts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  export default {
    getCounts,
  };