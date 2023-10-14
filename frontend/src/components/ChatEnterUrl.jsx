
import '../css/Chat.css'
import Button from "./Button"

const ChatEnterUrl = ({ children }) => {
    return (

        <div className="chatPageBody chatEnterUrl">
            <div style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '1000px' }}>
                {children}
            </div>
        </div>
    )
}

export default ChatEnterUrl