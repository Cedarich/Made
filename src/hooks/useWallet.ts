import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

interface WalletHook {
  address: string | null;
  isConnected: boolean;
  signer: ethers.Signer | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export function useWallet(): WalletHook {
  const [address, setAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  const connect = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setAddress(address);
        setSigner(signer);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      window.open('https://metamask.io/download/', '_blank');
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setSigner(null);
  }, []);

  useEffect(() => {
    // Handle account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          setAddress(accounts[0]);
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, [disconnect]);

  return {
    address,
    isConnected: !!address,
    signer,
    connect,
    disconnect,
  };
}

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}