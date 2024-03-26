import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from "react";
import Provider from '@/redux/provider';
import {Toaster} from "@/components/ui/toaster";
import Sidebar from "@/app/components/common/Sidebar";

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
      <body className={`${inter.className} bg-white text-black flex min-h-screen w-full dark:bg-gray-800`}>
        <Provider>
            <Sidebar />
            <div className="p-8 w-full">
                {children}
            </div>
        </Provider>
        <Toaster />
      </body>
    </html>
  )
}
