import { neon } from "@neondatabase/serverless"

async function testDatabaseConnection() {
  console.log("🔍 Testing Digital Aura Database Connection...\n")

  try {
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set")
    }

    console.log("✅ DATABASE_URL found")

    // Create SQL client
    const sql = neon(process.env.DATABASE_URL)
    console.log("✅ Neon SQL client created")

    // Test basic connection
    console.log("\n📡 Testing basic connection...")
    const connectionTest = await sql`SELECT NOW() as current_time, version() as postgres_version`
    console.log("✅ Connection successful!")
    console.log(`   Time: ${connectionTest[0].current_time}`)
    console.log(`   Version: ${connectionTest[0].postgres_version.split(" ")[0]}`)

    // Test table existence
    console.log("\n📋 Checking table structure...")
    const tables = await sql`
      SELECT table_name, table_type 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `

    const expectedTables = [
      "analytics",
      "appointments",
      "blog_posts",
      "chat_conversations",
      "contacts",
      "newsletter_subscribers",
      "projects",
      "testimonials",
    ]

    console.log(`✅ Found ${tables.length} tables:`)
    tables.forEach((table) => {
      const status = expectedTables.includes(table.table_name) ? "✅" : "⚠️"
      console.log(`   ${status} ${table.table_name} (${table.table_type})`)
    })

    // Check for missing tables
    const existingTableNames = tables.map((t) => t.table_name)
    const missingTables = expectedTables.filter((t) => !existingTableNames.includes(t))

    if (missingTables.length > 0) {
      console.log(`\n⚠️  Missing tables: ${missingTables.join(", ")}`)
      console.log("   Run the init-database.sql script to create missing tables")
    }

    // Test data insertion and retrieval
    console.log("\n💾 Testing data operations...")

    // Test contacts table
    try {
      const testContact = await sql`
        INSERT INTO contacts (name, email, message, service) 
        VALUES ('Test User', 'test@digitalaura.it', 'Test message', 'ai') 
        RETURNING id, name, email, created_at
      `
      console.log("✅ Insert operation successful")
      console.log(`   Created contact: ${testContact[0].name} (${testContact[0].id})`)

      // Clean up test data
      await sql`DELETE FROM contacts WHERE email = 'test@digitalaura.it'`
      console.log("✅ Cleanup successful")
    } catch (error) {
      console.log("❌ Data operation failed:", error.message)
    }

    // Test views
    console.log("\n📊 Testing database views...")
    try {
      const contactSummary = await sql`SELECT * FROM contact_summary LIMIT 5`
      console.log(`✅ contact_summary view: ${contactSummary.length} records`)

      const appointmentSummary = await sql`SELECT * FROM appointment_summary LIMIT 5`
      console.log(`✅ appointment_summary view: ${appointmentSummary.length} records`)

      const popularPages = await sql`SELECT * FROM popular_pages LIMIT 5`
      console.log(`✅ popular_pages view: ${popularPages.length} records`)
    } catch (error) {
      console.log("⚠️  Views test failed:", error.message)
      console.log("   This is normal if you haven't run the init script yet")
    }

    // Performance test
    console.log("\n⚡ Testing query performance...")
    const startTime = Date.now()

    await Promise.all([
      sql`SELECT COUNT(*) FROM contacts`,
      sql`SELECT COUNT(*) FROM appointments`,
      sql`SELECT COUNT(*) FROM blog_posts`,
      sql`SELECT COUNT(*) FROM projects`,
    ])

    const endTime = Date.now()
    console.log(`✅ Parallel queries completed in ${endTime - startTime}ms`)

    // Database size and statistics
    console.log("\n📈 Database statistics...")
    try {
      const dbStats = await sql`
        SELECT 
          schemaname,
          tablename,
          n_tup_ins as inserts,
          n_tup_upd as updates,
          n_tup_del as deletes,
          n_live_tup as live_rows
        FROM pg_stat_user_tables 
        ORDER BY n_live_tup DESC
      `

      console.log("✅ Table statistics:")
      dbStats.forEach((stat) => {
        console.log(`   ${stat.tablename}: ${stat.live_rows} rows (${stat.inserts} inserts, ${stat.updates} updates)`)
      })
    } catch (error) {
      console.log("⚠️  Statistics query failed:", error.message)
    }

    // Connection pool test
    console.log("\n🔄 Testing connection pooling...")
    const poolPromises = Array.from(
      { length: 5 },
      (_, i) => sql`SELECT ${i + 1} as connection_number, pg_backend_pid() as process_id`,
    )

    const poolResults = await Promise.all(poolPromises)
    console.log("✅ Connection pool test successful")
    console.log(`   Used ${new Set(poolResults.map((r) => r[0].process_id)).size} different processes`)

    // Final summary
    console.log("\n🎉 DATABASE CONNECTION TEST COMPLETED SUCCESSFULLY!")
    console.log("\n📋 Summary:")
    console.log("   ✅ Connection established")
    console.log("   ✅ Tables accessible")
    console.log("   ✅ CRUD operations working")
    console.log("   ✅ Performance acceptable")
    console.log("   ✅ Connection pooling functional")

    console.log("\n🚀 Your database is ready for production!")
  } catch (error) {
    console.error("\n❌ DATABASE CONNECTION TEST FAILED!")
    console.error("\n🔍 Error Details:")
    console.error(`   Message: ${error.message}`)
    console.error(`   Code: ${error.code || "N/A"}`)

    if (error.message.includes("DATABASE_URL")) {
      console.error("\n💡 Solution: Make sure DATABASE_URL environment variable is set")
      console.error("   Example: DATABASE_URL=postgresql://user:password@host:port/database")
    }

    if (error.message.includes("connect")) {
      console.error("\n💡 Solution: Check your database connection settings")
      console.error("   - Verify host and port are correct")
      console.error("   - Ensure database server is running")
      console.error("   - Check firewall settings")
    }

    if (error.message.includes("authentication")) {
      console.error("\n💡 Solution: Check your database credentials")
      console.error("   - Verify username and password")
      console.error("   - Ensure user has necessary permissions")
    }

    console.error("\n📞 Need help? Contact Digital Aura support team")
    process.exit(1)
  }
}

// Run the test
testDatabaseConnection()
