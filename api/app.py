from flask import Flask
from flask_cors import CORS
from routes.common_routes import common_bp
from config import is_production, logger

def create_app():
    """
    Application factory pattern for creating Flask apps
    """
    app = Flask(__name__)
    
    # Configure CORS
    CORS(app, expose_headers=['Content-Disposition'])
    
    # Register blueprints
    app.register_blueprint(common_bp, url_prefix='/api')
    
    return app

# Create app instance
app = create_app()

if __name__ == 'main':
    logger.info("Starting Flask app...")
    
    # Enable debug mode if not production
    debug_mode = not is_production
    logger.info(f"Debug mode: {debug_mode}")
    
    app.run(debug=debug_mode, threaded=True, host='0.0.0.0', port=5328) 