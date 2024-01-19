import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from "react";
import Nav from "@/app/components/common/Nav";
import Provider from '@/redux/provider';
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HPC Monitoring System',
  description: 'HPC monitoring System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-gray-800`}>
        <Provider>
            <Nav />
            {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  )
}
