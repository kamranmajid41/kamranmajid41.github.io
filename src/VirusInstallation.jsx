import { useState, useEffect } from 'react';
import BlackScreen from './BlackScreen'; // Import the new BlackScreen component
import './FakeVirus.css';

const VirusInstallation = () => {
  const [progress, setProgress] = useState(0);
  const [consoleMessages, setConsoleMessages] = useState([]);
  const [terminalMessages, setTerminalMessages] = useState([]);
  const [statusMessage, setStatusMessage] = useState("Initializing virus installation...");
  const [installationComplete, setInstallationComplete] = useState(false);

  // Check if installation is already complete (stored in localStorage)
  useEffect(() => {
    if (localStorage.getItem('installationComplete') === 'true') {
      setInstallationComplete(true);
    }
  }, []);

  // Define unique system log messages
  const logMessages = [
    'Accessing C:\\Windows\\System32...',
    'Bypassing firewall settings...',
    'User files accessed: C:\\Users\\Public\\Documents...',
    'Modifying registry keys...',
    'Gaining root access to kernel...',
    'Injecting malicious code into system processes...',
    'Accessing system camera...',
    'Disabling antivirus...',
    'System security compromised.',
    'Malware detected in background processes...',
    'Installing system backdoor...',
    'Injecting payload into startup sequence...',
    'Escalating privileges...',
    'Bypassing user authentication...',
    'Exploring C:\\Program Files\\...',
    'Executing remote command injection...',
    'Modifying network adapter settings...',
    'Collecting system information...',
    'Installing keylogger...',
    'Hiding traces of infection...',
    'Persisting malware in system boot...',
    'Accessing WiFi configuration...',
    'Disabling Windows Defender...',
    'Stealing user credentials...',
    'Redirecting DNS requests...',
    'Disabling Windows Update...',
    'Enabling persistent background processes...',
    'Overwriting system files...',
    'Clearing system event logs...',
    'Compromising system encryption...',
  ];

  // Define unique terminal messages
  const terminalCommands = [
    'C:\\> Initiating system check...',
    'C:\\> Connecting to remote server...',
    'C:\\> User credentials validated...',
    'C:\\> Executing file operations...',
    'C:\\> Modifying registry...',
    'C:\\> Adjusting system settings...',
    'C:\\> Installing core files...',
    'C:\\> System update complete.',
    'C:\\> Running background processes...',
    'C:\\> Finalizing installation...',
    'C:\\> Virus installation complete.',
    'C:\\> Cleaning up residual data...',
    'C:\\> Testing system integrity...',
    'C:\\> Verifying file signatures...',
    'C:\\> Encrypting user data...',
    'C:\\> Injecting malware into system...',
    'C:\\> Patching vulnerabilities...',
    'C:\\> Updating system firmware...',
    'C:\\> Activating remote access...',
    'C:\\> Installing rootkit...',
    'C:\\> Rebooting system...',
    'C:\\> Restarting infected processes...',
    'C:\\> Waiting for user input...',
    'C:\\> Generating system report...',
    'C:\\> Modifying operating system settings...',
    'C:\\> Completing installation...',
    'C:\\> Sending data to remote server...',
    'C:\\> Re-enabling antivirus...',
  ];

  // Function to generate unique terminal messages
  const generateTerminalMessage = () => {
    return terminalCommands[Math.floor(Math.random() * terminalCommands.length)];
  };

  // Function to generate unique system log messages
  const generateLogMessage = () => {
    return logMessages[Math.floor(Math.random() * logMessages.length)];
  };

  useEffect(() => {
    if (installationComplete) return; // Prevent starting the process if installation is already complete

    // Fake terminal logs to simulate a real virus process
    const fakeTerminalScript = () => {
      let i = 0;
      const terminalInterval = setInterval(() => {
        setTerminalMessages(prev => [...prev, generateTerminalMessage()]);
        i++;
        if (i >= 10000) {
          clearInterval(terminalInterval); // Stop after 10,000 commands
        }
      }, 10); // Updates every 10ms for fast terminal output
    };

    // Fast progress bar update
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setInstallationComplete(true);
          localStorage.setItem('installationComplete', 'true'); // Store completion status
          return 100;
        }
        return prev + Math.random() * 5; // Faster progress (increment by random higher value)
      });
    }, 50); // Progress bar updates every 50ms

    // Update status message
    const statusMessages = [
      "Initializing virus installation...",
      "Bypassing firewall...",
      "Accessing system files...",
      "Installing backdoor...",
      "Activating rootkit...",
      "Modifying system registry...",
      "Injecting payload into system...",
      "Securing remote access...",
      "System compromised. Preparing payload...",
      "Finalizing infection...",
      "Virus installation complete.",
    ];

    const statusInterval = setInterval(() => {
      const randomStatus = statusMessages[Math.floor(Math.random() * statusMessages.length)];
      setStatusMessage(randomStatus);
    }, 500); // Updates every 500ms with a random message

    // System log updates (unique messages)
    const logInterval = setInterval(() => {
      setConsoleMessages(prev => [...prev, generateLogMessage()]);
    }, 5); // Log updates every 5ms for rapid message flow

    fakeTerminalScript();

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
      clearInterval(statusInterval);
    };
  }, [installationComplete]);

  // If the installation is complete, show the black screen
  if (installationComplete) {
    return <BlackScreen />; // Render the BlackScreen component
  }


  return (
    <div className="virus-container">
      <div className="left-side">
        <div className="status-message">{statusMessage}</div> {/* Status message */}
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${progress}%`, transition: 'width 0.05s linear' }}
            ></div>
          </div>
        </div>
        <div className="system-log">
          {consoleMessages.slice(-30).map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>

      <div className="right-side">
        <div className="terminal">
          <div className="terminal-output">
            {terminalMessages.slice(-30).map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirusInstallation;
