import React, { useState, useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import styles from "./ProfilerHead.module.css";
import profilImg from "../../../Images/designderimg.png";
import award from "../../../Images/award.png";
// API
import { getUserByID, followAUser } from "../../../API/auth";
// React Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import ModalStory from "./ModalStory";
import ModalPost from "./ModalPost";
import ModalBank from "./ModalBank";
//redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";
// Spinner
import { RotatingLines } from "react-loader-spinner";
// API
import { createConversation, getUserById } from "../../../actions/user";
import { GetLoggedInUser } from "../../../actions/auth";

const ProfilerHead = ({
  auth: { loading, user },
  profile,
  createConversation,
  user: { users },
}) => {
  const [showBank, setShowBank] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showPicture, setShowPicture] = useState(false);
  const [likes, setLikes] = useState(0);

  const url = window.location.href;
  const id = url.split("/").pop();

  const handleCloseBank = () => setShowBank(false);
  const handleShowBank = () => setShowBank(true);

  const handleCloseStory = () => setShowStory(false);
  const handleShowStory = () => setShowStory(true);

  const handleClosePost = () => setShowPost(false);
  const handleShowPost = () => setShowPost(true);

  const handleClosePicture = () => setShowPicture(false);
  const handleShowPicture = () => setShowPicture(true);

  useEffect(() => {
    store.dispatch(GetLoggedInUser());
    if (id != "me") store.dispatch(getUserById(id));
    // Check number of likes

    if (profile) {
      // Check number of likes
      for (let i = 0; i < profile?.posts?.length; i++) {
        if (profile?.posts[i]?.likes?.length > 0) {
          setLikes(likes + profile?.posts[i].likes.length);
        }
      }
    }
  }, [profile]);

  const followUser = async (id) => {
    await followAUser(
      id,
      (res) => {
        console.log(res.message);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  console.log(profile);
  console.log(showStory);

  const createAConversation = (senderID) => {
    let tempObj = {
      senderId: user._id,
      receiverId: senderID,
    };
    createConversation(tempObj);
  };
  return (
    <>
      {loading ? (
        <div style={{ width: "100vw", textAlign: "center" }}>
          <RotatingLines
            strokeColor="#00e5be"
            strokeWidth="5"
            animationDuration="0.75"
            width="64"
            visible={true}
          />
        </div>
      ) : (
        <div className={styles.proflerMain}>
          <div className={styles.DesigaREA}>
            <div className={styles.designerName}>{user?.userName}</div>
            {id == "me" && (
              <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  <BiDotsHorizontalRounded className={styles.dots} />
                  <ModalStory
                    showStory={showStory}
                    handleCloseStory={handleCloseStory}
                  />
                  <ModalPost
                    showPost={showPost}
                    handleClosePost={handleClosePost}
                  />
                  <ModalBank
                    showBank={showBank}
                    handleCloseBank={handleCloseBank}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href=""
                    onClick={() => setShowStory(!showStory)}
                  >
                    Create A Story
                  </Dropdown.Item>
                  <Dropdown.Item href="" onClick={() => setShowPost(!showPost)}>
                    Create A Post
                  </Dropdown.Item>
                  <Dropdown.Item href="/camera">Upload A Picture</Dropdown.Item>
                  <Dropdown.Item href="" onClick={() => setShowBank(!showBank)}>
                    Attach Bank Account
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
          <div className={styles.infoArea}>
            <div className={styles.imagesArea}>
              <img className={styles.imagesOuter} src={user?.image} alt="" />
              <div className={styles.profileNmae}>
                {user?.firstName + " " + user?.lastName}
              </div>
              <div className={styles.profilTextDeatail}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
            </div>
            <div className={styles.acountDetail}>
              {id != "me" ? (
                <>
                  <div className={styles.postDetail}>
                    <div className={styles.posts}>
                      <div className={styles.postsNumber}>
                        {users?.posts?.length || 0}
                      </div>
                      <div className={styles.postsText}>Posts</div>
                    </div>
                    <div className={styles.posts}>
                      <div className={styles.postsNumber}>
                        {users?.followers?.length || 0}
                      </div>
                      <div className={styles.postsText}>Followers</div>
                    </div>
                    <div className={styles.posts}>
                      <div className={styles.postsNumber}>
                        {users?.following?.length || 0}
                      </div>
                      <div className={styles.postsText}>Following</div>
                    </div>
                    <div className={styles.posts}>
                      <div className={styles.postsNumber}>{likes}</div>
                      <div className={styles.postsText}>Likes</div>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    {user?.designerOfDay && (
                      <div className={styles.awardArea}>
                        <div className={styles.awardText}>
                          <i
                            className={`fa-solid fa-trophy ${styles.awardTrophy} ${styles.bronzeTrophy}`}
                          ></i>
                        </div>
                      </div>
                    )}
                    {user?.designerOfMonth && (
                      <div className={styles.awardArea}>
                        <div className={styles.awardText}>
                          <i
                            className={`fa-solid fa-trophy ${styles.awardTrophy} ${styles.silverTrophy}`}
                          ></i>
                        </div>
                      </div>
                    )}
                    {user?.designerOfYear && (
                      <div className={styles.awardArea}>
                        <div className={styles.awardText}>
                          <i
                            className={`fa-solid fa-trophy ${styles.awardTrophy} ${styles.goldTrophy}`}
                          ></i>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.postDetail}>
                    <div className={styles.posts}>
                      <div className={styles.postsNumber}>
                        {user?.posts?.length || 0}
                      </div>
                      <div className={styles.postsText}>Posts</div>
                    </div>
                    <div className={styles.posts}>
                      <div className={styles.postsNumber}>
                        {user?.followers?.length || 0}
                      </div>
                      <div className={styles.postsText}>Followers</div>
                    </div>
                    <div className={styles.posts}>
                      <div className={styles.postsNumber}>
                        {user?.following?.length || 0}
                      </div>
                      <div className={styles.postsText}>Following</div>
                    </div>
                    <div className={styles.posts}>
                      <div className={styles.postsNumber}>
                        {user?.likesThisYear}
                      </div>
                      <div className={styles.postsText}>Likes</div>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    {user?.designerOfDay && (
                      <div className={styles.awardArea}>
                        <div className={styles.awardText}>
                          <i
                            className={`fa-solid fa-trophy ${styles.awardTrophy} ${styles.bronzeTrophy}`}
                          ></i>
                        </div>
                      </div>
                    )}
                    {user?.designerOfMonth && (
                      <div className={styles.awardArea}>
                        <div className={styles.awardText}>
                          <i
                            className={`fa-solid fa-trophy ${styles.awardTrophy} ${styles.silverTrophy}`}
                          ></i>
                        </div>
                      </div>
                    )}
                    {user?.designerOfYear && (
                      <div className={styles.awardArea}>
                        <div className={styles.awardText}>
                          <i
                            className={`fa-solid fa-trophy ${styles.awardTrophy} ${styles.goldTrophy}`}
                          ></i>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {id != "me" && (
                <div className={styles.buttonsArea}>
                  <button
                    className={styles.folowbut}
                    onClick={() => followUser(id)}
                  >
                    Follow
                  </button>
                  <button
                    className={styles.messageBut}
                    onClick={() => {
                      sessionStorage.removeItem("receiverId");
                      const receiverID = window.location.href.split("/").pop();
                      sessionStorage.setItem("receiverId", receiverID);

                      createAConversation(id);
                    }}
                  >
                    Message
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.folwedArea}>
            <div className={styles.textArea}>
              <div className={styles.folledText}>Followed by</div>
              <div className={styles.viewAll}>View all</div>
            </div>
            <div className={styles.cardArea}>
              {id != "me" ? (
                users?.followers?.length > 0 ? (
                  users?.followers?.map((item) => {
                    console.log("item: ", item);
                    return (
                      <div className={styles.cardsOuter}>
                        <div className>
                          <img
                            src={item.image}
                            className={styles.followerImg}
                            alt=""
                          />
                        </div>
                        <div className={styles.followerName}>
                          {item.firstName + " " + item.lastName}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div
                    style={{ color: "red", fontWeight: 600, fontSize: "25px" }}
                  >
                    No one is following this user
                  </div>
                )
              ) : users?.followers?.length > 0 ? (
                users?.followers?.map((item) => {
                  console.log("item: ", item);
                  return (
                    <div className={styles.cardsOuter}>
                      <div className>
                        <img
                          src={item.image}
                          className={styles.followerImg}
                          alt=""
                        />
                      </div>
                      <div className={styles.followerName}>
                        {item.firstName + " " + item.lastName}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{ color: "red", fontWeight: 600, fontSize: "25px" }}
                >
                  No one is following you
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ProfilerHead.propTypes = {
  createConversation: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { createConversation })(ProfilerHead);
