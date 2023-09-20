const axios = require('axios');
const fs = require('fs');

async function addSongs(token, file) {
  try {
    // Read the text file containing the YouTube songs
    const songs = fs.readFileSync(file, 'utf-8').split('\n');

    for (const song of songs) {
      // Remove any trailing newline or whitespace characters
      const cleanSong = song.trim();

      // Build the Nightbot API URL to add a YouTube song
      const url = 'https://api.nightbot.tv/1/song_requests/playlist';
      const data = { q: cleanSong };
      const headers = { Authorization: `Bearer ${token}` };

      // Make the POST request to add the song to Nightbot
      try {
        const response = await axios.post(url, data, { headers });
        if (response.status === 200) {
          console.log(`Song added: ✅ ${cleanSong} ✅ `);
        } else {
          console.log(`Server response: ❌ ${error.response.data.message} ❌ `);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log(`Server response: ⚠️  ${error.response.data.message} ⚠️`);
        } else {
          console.error(error);
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

// Example usage
const accessToken = 'YOUR TOKEN HERE';
const songsFile = 'YOUR TXT FILE LOCATION';
addSongs(accessToken, songsFile);