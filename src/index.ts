import app from './app';
import mongoConnect from './utils/db';

const port = process.env.PORT || 3000;
(async () => {
  try {
    await mongoConnect();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Server error', (error as Error).message);
  }
})();
