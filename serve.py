#!/usr/bin/env python3
"""
Simple HTTP server to run the game locally.

Usage:
    python serve.py
    or
    python3 serve.py

Then open: http://localhost:8000
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers to prevent caching issues during development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def main():
    # Change to script directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    Handler = MyHTTPRequestHandler

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print("🎮 Fantasy Birthday Game - Local Server")
        print("=" * 60)
        print(f"\n✅ Server running at: {url}")
        print(f"\n📂 Serving files from: {os.getcwd()}")
        print("\n🌐 Opening browser...")
        print("\n⚠️  Press Ctrl+C to stop the server")
        print("=" * 60)

        # Open browser
        webbrowser.open(url)

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped. Thanks for testing!")

if __name__ == "__main__":
    main()
