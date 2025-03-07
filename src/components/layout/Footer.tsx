
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border/20 py-6 md:py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 md:gap-8">
          <p className="text-sm text-muted-foreground">
            © {currentYear} DataLab. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a 
              href="#" 
              className="hover:text-foreground transition-colors duration-200"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="hover:text-foreground transition-colors duration-200"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="hover:text-foreground transition-colors duration-200"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
