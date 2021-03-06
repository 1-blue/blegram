const Post = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      _id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "게시글의 아이디 ( 게시글을 식별할 값 )",
      },
      content: {
        type: DataTypes.STRING(2200),
        alllowNull: true,
        comment: "게시글의 내용 ( 최대 2200자, , 특수문자 가능 )",
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "Post",
      tableName: "posts",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    },
  );

  Post.associate = db => {
    // 유저와 게시글 ( 1 : N )
    db.Post.belongsTo(db.User, { foreignKey: "UserId", onDelete: "cascade" });

    // 유저와 댓글 ( 1 : N )
    db.Post.hasMany(db.Comment, { onDelete: "cascade" });

    // 게시글 좋아요 ( N : M ) ( 유저와 게시글 )
    db.Post.belongsToMany(db.User, {
      through: "PostLikes",
      as: "PostLikers",
      foreignKey: "PostId",
      onDelete: "cascade",
    });

    // 해시태그 ( N : M ) ( 게시글과 해시태그 )
    db.Post.belongsToMany(db.Hashtag, {
      through: "PostHashtags",
      as: "postHashtager",
      foreignKey: "PostId",
      onDelete: "cascade",
    });

    // 게시글과 이미지 ( 1 : N )
    db.Post.hasMany(db.Photo, { onDelete: "cascade" });

    // 유저와 게시글 ( N : M ) ( 북마크 )
    db.Post.belongsToMany(db.User, {
      through: "Bookmarks",
      as: "PostBookmarks",
      foreignKey: "PostId",
      onDelete: "cascade",
    });
  };

  return Post;
};

export default Post;
