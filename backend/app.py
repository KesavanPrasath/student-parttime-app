from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# Database configuration
db_config = {
    'host': '34.136.166.121',
    'user': 'admin',
    'password': 'password',
    'database': 'shiftsync',
    'cursorclass': pymysql.cursors.DictCursor
}

def get_db_connection():
    return pymysql.connect(**db_config)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "backend is running..."}), 200

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'student') 

    if not name or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    # Securely hash the password before saving it
    hashed_password = generate_password_hash(password)

    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            # Check if user already exists
            cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
            if cursor.fetchone():
                return jsonify({"error": "Email already registered"}), 400

            # Insert new user
            sql = "INSERT INTO users (name, email, password_hash, role) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (name, email, hashed_password, role))
            connection.commit()
            return jsonify({"message": "User registered successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        connection.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
            user = cursor.fetchone()
            
            # TEMPORARY: Check plain text password directly for testing
            if user and (user['password_hash'] == password or check_password_hash(user['password_hash'], password)):
                user.pop('password_hash', None) 
                return jsonify({"message": "Login successful", "user": user}), 200
            else:
                return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        connection.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)