// WordPress REST API Debug Script
// Run with: node debug-wordpress.js

const https = require('https');

const WORDPRESS_URL = 'https://new-site.local';

// Create agent that ignores SSL errors (for local dev)
const agent = new https.Agent({
    rejectUnauthorized: false
});

async function testEndpoint(path, description) {
    return new Promise((resolve) => {
        console.log(`\n🔍 Testing: ${description}`);
        console.log(`   URL: ${WORDPRESS_URL}${path}`);

        const req = https.get(`${WORDPRESS_URL}${path}`, { agent }, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.log(`   ✅ Status: ${res.statusCode}`);
                console.log(`   Headers:`, res.headers);

                if (res.statusCode === 200) {
                    try {
                        const json = JSON.parse(data);
                        console.log(`   📦 Response type: ${Array.isArray(json) ? 'Array' : 'Object'}`);
                        if (Array.isArray(json)) {
                            console.log(`   📊 Items count: ${json.length}`);
                        }
                    } catch (e) {
                        console.log(`   ⚠️  Response is not JSON`);
                        console.log(`   First 200 chars: ${data.substring(0, 200)}`);
                    }
                } else {
                    console.log(`   ❌ Error response: ${data.substring(0, 500)}`);
                }
                resolve();
            });
        });

        req.on('error', (error) => {
            console.log(`   ❌ Request failed: ${error.message}`);
            resolve();
        });

        req.setTimeout(10000, () => {
            console.log(`   ⏱️  Request timed out`);
            req.destroy();
            resolve();
        });
    });
}

async function runDiagnostics() {
    console.log('='.repeat(60));
    console.log('WordPress REST API Diagnostics');
    console.log('='.repeat(60));

    await testEndpoint('/', 'WordPress Homepage');
    await testEndpoint('/wp-json', 'REST API Root');
    await testEndpoint('/wp-json/wp/v2', 'REST API v2 Root');
    await testEndpoint('/wp-json/wp/v2/posts?per_page=1', 'Posts Endpoint (1 post)');
    await testEndpoint('/wp-json/wp/v2/categories', 'Categories Endpoint');
    await testEndpoint('/wp-json/wp/v2/tags', 'Tags Endpoint');
    await testEndpoint('/wp-json/wp/v2/users', 'Users Endpoint');

    console.log('\n' + '='.repeat(60));
    console.log('Diagnostics Complete');
    console.log('='.repeat(60));
}

runDiagnostics();
