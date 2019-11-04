const DEFAULT_FILE_NAME = 'test.json';

const loadJSONFromFile = async (fileName = DEFAULT_FILE_NAME) => {
  try {
    const promiseResponse = await fetch(fileName);
    const data = await promiseResponse.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const saveJSONToFile = (content, fileName = DEFAULT_FILE_NAME) => {
  // TODO
}

export { loadJSONFromFile, saveJSONToFile };
