const express = require("express")

const {createClient} = require("@supabase/supabase-js")
require("dotenv").config()

const Url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_KEY

const supabase = createClient(Url, key)

module.exports=supabase