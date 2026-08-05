async function runTests() {
  const baseUrl = 'http://localhost:3000';
  
  console.log('--- STARTING API VERIFICATION ---');

  // Test 1: POST /api/register
  const newProvider = {
    name: 'Alice Cooper',
    phone: '+1-555-0199',
    skill: 'Electrician',
    city: 'Seattle'
  };

  console.log('\n[TEST 1] Registering a new service provider...');
  try {
    const postRes = await fetch(`${baseUrl}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProvider)
    });
    const postData = await postRes.json();
    console.log(`Status: ${postRes.status}`);
    console.log('Response:', JSON.stringify(postData, null, 2));

    if (!postData.success || !postData.data || !postData.data.id) {
      throw new Error('Registration failed, could not proceed with tests.');
    }

    const createdId = postData.data.id;

    // Test 2: GET /api/providers
    console.log('\n[TEST 2] Retrieving all service providers...');
    const getAllRes = await fetch(`${baseUrl}/api/providers`);
    const getAllData = await getAllRes.json();
    console.log(`Status: ${getAllRes.status}`);
    console.log('Response:', JSON.stringify(getAllData, null, 2));

    // Test 3: GET /api/providers/:id (Existing)
    console.log(`\n[TEST 3] Retrieving details of provider with ID ${createdId}...`);
    const getSingleRes = await fetch(`${baseUrl}/api/providers/${createdId}`);
    const getSingleData = await getSingleRes.json();
    console.log(`Status: ${getSingleRes.status}`);
    console.log('Response:', JSON.stringify(getSingleData, null, 2));

    // Test 4: GET /api/providers/:id (Non-existing)
    const fakeId = 999999;
    console.log(`\n[TEST 4] Retrieving details of non-existing provider with ID ${fakeId}...`);
    const getFakeRes = await fetch(`${baseUrl}/api/providers/${fakeId}`);
    const getFakeData = await getFakeRes.json();
    console.log(`Status: ${getFakeRes.status}`);
    console.log('Response:', JSON.stringify(getFakeData, null, 2));

  } catch (error) {
    console.error('Test execution failed:', error.message);
  }
}

runTests();
