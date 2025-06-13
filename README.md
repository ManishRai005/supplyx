# SupplyX - Ethical Supply Chain Tracker

A blockchain-based supply chain tracking system built on the Internet Computer Protocol (ICP) that ensures transparency and ethical practices in global supply chains.

![SupplyX Logo](src/frontend/public/images/logo.svg)

## Features

- 🔍 **QR Code Tracking**: Instantly access product history and verify authenticity
- ✅ **Ethical Verification**: Ensure products meet fair trade and ethical sourcing standards
- 📊 **Supply Chain Visibility**: Track products from source to consumer with complete transparency
- 🌙 **Dark/Light Mode**: Modern UI with theme support
- 🔒 **Secure Authentication**: Internet Identity integration

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [DFX](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) (latest version)
- [Rust](https://www.rust-lang.org/tools/install)
- [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) (for Windows users)

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/Nikhil-0GX/ethical-supply-chain-tracker.git
   cd ethical-supply-chain-tracker
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd src/frontend
   npm install
   cd ../..

   # Install Rust dependencies
   cd src/backend
   cargo build
   cd ../..
   ```

3. Start the local Internet Computer replica:
   ```bash
   dfx start --clean --background
   ```

4. Deploy the canisters:
   ```bash
   dfx deploy
   ```

5. Start the frontend development server:
   ```bash
   cd src/frontend
   npm start
   ```

6. Open your browser and navigate to:
   - Frontend: http://localhost:3000
   - Internet Identity: http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai

## Development

### Project Structure
```
ethical-supply-chain-tracker/
├── src/
│   ├── frontend/          # React frontend application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── contexts/
│   │   │   ├── pages/
│   │   │   └── services/
│   │   └── public/
│   └── backend/          # Rust backend canister
├── .dfx/                # DFX configuration
└── dfx.json            # Canister configuration
```

### Available Scripts

- `dfx start`: Start the local Internet Computer replica
- `dfx deploy`: Deploy all canisters
- `dfx generate`: Generate canister interfaces
- `npm start`: Start the frontend development server
- `npm build`: Build the frontend for production

## Testing

```bash
# Run frontend tests
cd src/frontend
npm test

# Run backend tests
cd src/backend
cargo test
```

## Deployment

1. Build the project:
   ```bash
   dfx build
   ```

2. Deploy to the Internet Computer mainnet:
   ```bash
   dfx deploy --network ic
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Internet Computer](https://internetcomputer.org/)
- Frontend powered by [React](https://reactjs.org/) and [Material-UI](https://mui.com/)
- Authentication by [Internet Identity](https://identity.ic0.app/)

## Contact

Nikhil - [@Nikhil-0GX](https://github.com/Nikhil-0GX)

Project Link: [https://github.com/Nikhil-0GX/ethical-supply-chain-tracker](https://github.com/Nikhil-0GX/ethical-supply-chain-tracker)# supplyx
