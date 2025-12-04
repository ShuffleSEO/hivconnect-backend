import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <Image
          src="/logo.png"
          alt="MSHTGA Logo"
          width={80}
          height={80}
          className="dashboard-logo"
        />
        <h1>HIV Connect Central NJ</h1>
        <p className="tagline">Content Management System</p>
      </div>

      <div className="dashboard-content">
        {user ? (
          <h2>Welcome back, {user.email}</h2>
        ) : (
          <h2>Welcome to HIV Connect Central NJ</h2>
        )}

        <div className="dashboard-cards">
          <div className="card">
            <h3>Admin Panel</h3>
            <p>Manage providers, resources, blog posts, and more</p>
            <a className="btn-primary" href={payloadConfig.routes.admin}>
              Go to Admin Panel
            </a>
          </div>

          <div className="card">
            <h3>Public Website</h3>
            <p>View the live HIV Connect Central NJ website</p>
            <a
              className="btn-secondary"
              href="https://hivconnect-frontend.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Public Website
            </a>
          </div>

          <div className="card">
            <h3>Documentation</h3>
            <p>Learn how to use PayloadCMS</p>
            <a
              className="btn-outline"
              href="https://payloadcms.com/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <p>© 2025 HIV Connect Central NJ</p>
      </div>
    </div>
  )
}
